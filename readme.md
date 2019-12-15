# cc98-mirror

A simple way to forward cc98 service from intranet to extranet.

## feature

1. Menu option `notice`, provide notifications you received.
2. Menu option `social`, abour your fans and followers.
3. Advanced menu option `search`, add sub-option `search user`.
4. Image compress option, make image transferring more faster.
5. Timely notification, menu color will change automatically.
6. Button `signin`, there's still a bug when someone never signin before.
7. HTTP links redirect, include topic links and normal links.
8. Modified infinite list, support multiple web requests.
9. New `share` mode, support sharing topics without password.
10. And so on.

## prepare

1. Extranet server like AliYun.
2. Intranet server who can connect to cc98 server.

## cc98-pwa

Refer to [cc98-pwa](https://github.com/ZJU-CC98/CC98-PWA), try to depoly this site in your extranet server as cc98 mirror site.

## forward

Use flask(requests) module to forward your request to real cc98 server.

## diagram

![](diagram.jpg)
