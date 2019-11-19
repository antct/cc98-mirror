from flask import Flask, Response, request, Blueprint
import requests
import re

cc98 = Blueprint('cc98', __name__)

proxy_cc98_site = ''
proxy_cc98_api = ''

excluded_requ_headers = ['Host']
excluded_resp_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']

@cc98.route('/token', methods=['POST'])
def token():
    data = request.form.to_dict()
    resp = requests.post(url='https://openid.cc98.org/connect/token', data=data)
    content, status_code, headers = resp.content, resp.status_code, resp.raw.headers
    headers['Access-Control-Allow-Origin'] = proxy_cc98_site
    headers = [(name, value) for (name, value) in headers.items() if name.lower() not in excluded_resp_headers]
    resp = Response(content, status_code, headers)
    return resp

@cc98.route('/files/<regex(r".*"):url>', methods=['GET'])
def files(url):
    file_format = url[url.rfind('.')+1:]
    if file_format in ['jpg', 'jpeg', 'png']:
        image = requests.get('http://file.cc98.org/{}'.format(url))
        resp = Response(image, mimetype="image/{}".format(file_format))
    else:
        file =  requests.get('http://file.cc98.org/{}'.format(url))
        resp = Response(file)
    return resp

@cc98.route('/images/<regex(r".*"):url>', methods=['GET'])
def images(url):
    image_format = url[url.rfind('.')+1:]
    image = requests.get('https://www.cc98.org/static/images/{}'.format(url))
    resp = Response(image, mimetype="image/{}".format(image_format))
    return resp

@cc98.route('/<regex(r".*"):url>', methods=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'])
def forward(url):
    fix_args = {}
    for key, value in request.args.items():
        fix_args[key] = request.args.getlist(key)
    fix_data = request.get_data()
    resp = requests.request(
            method=request.method,
            url='https://api-v2.cc98.org/{}'.format(url),
            headers={key: value for (key, value) in request.headers if key not in excluded_requ_headers},
            params=fix_args,
            data=fix_data,
            cookies=request.cookies,
            allow_redirects=True)
    content, status_code, headers = str(resp.content, encoding='utf-8'), resp.status_code, resp.raw.headers
    headers['Access-Control-Allow-Origin'] = proxy_cc98_site
    headers = [(name, value) for (name, value) in headers.items() if name.lower() not in excluded_resp_headers]
    content = re.sub('https?://www.cc98.org/static/images/(.*?[jpg|png|jpeg])', '{}/cc98/images/\g<1>'.format(proxy_cc98_api), content)
    content = re.sub('https?://file.cc98.org/(.*?[jpg|png|jpeg])', '{}/cc98/files/\g<1>'.format(proxy_cc98_api), content)
    content = re.sub('https?://www.cc98.org', '{}'.format(proxy_cc98_site), content)
    content = re.sub('{}/topic/[0-9/#]+'.format(proxy_cc98_site), '[url]\g<0>[/url]', content)
    resp = Response(bytes(content, encoding='utf-8'), status_code, headers)
    return resp
