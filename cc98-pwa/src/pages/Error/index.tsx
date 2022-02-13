import { ILocation, Route } from '@/router/Router'
import { Router } from '@reach/router'
import React from 'react'
import Page400 from './400'
import Page401 from './401'
import Page403 from './403'
import Page404 from './404'
import Page410 from './410'
import Page500 from './500'
import Page510 from './510'

export default React.memo(({ location }: ILocation) =>
  <Router location={location}>
    <Route path="400" component={Page400} />
    <Route path="401" component={Page401} />
    <Route path="403" component={Page403} />
    <Route path="404" component={Page404} />
    <Route path="410" component={Page410} />
    <Route path="500" component={Page500} />
    <Route path="510" component={Page510} />
    <Route default component={Page404} />
  </Router>
)