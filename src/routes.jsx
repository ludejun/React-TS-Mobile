import React from 'react';
import { HashRouter, Route} from 'react-keeper';
import App from './pages/App';
// import LoginPage from './pages/login/index';
import Layout from './pages/layout';
import NotFound from './pages/layout/404';

export default function() {
  return (
    <HashRouter>
      <Route cache index path="/" component={App} />
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
    </HashRouter>
  );
}

function loginCheck(cb, props) {
  if(props.user) {
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
