import React from 'react';
import { BrowserRouter, Route } from 'react-keeper';
import App from './pages/App';
import JSBridgeDemo from './pages/jsBridgeDemo/demo';
// import LoginPage from './pages/login/index';
import Layout from './pages/layout';
import NotFound from './pages/layout/404';

export default function() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route cache index path="/" component={App} />
        <Route path="/jsbridgedemo" component={JSBridgeDemo} />
      </React.Fragment>
      {/* <Route component={Layout} path="/main" enterFilter={[loginCheck]}>
        <Route index component={Layout} path="/info" />
        <Route component={Layout} path="/edit" />
      </Route> */}
      {/* <Route loadComponent={(cb)=>{
        import('../Products.js').then((Products)=>{
          cb(Products)
        })
      }} path='/user'></Route> // 动态化加载路由组件*/}
      {/* <Route component={NotFound} miss /> */}
    </BrowserRouter>
  );
}

function loginCheck(cb, props) {
  if (props.user) {
    cb();
  }
}

// function PrivateRoute({ children, ...rest }) {
//   // const { isAuth } = store.getState().user;
//   const isAuth = true;

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuth ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }
