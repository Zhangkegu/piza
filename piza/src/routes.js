import Home from './components/Home';
import Menu from './components/Menu';
import Admin from './components/Admin';
import About from './components/About/About';
import Login from './components/Login';
import Register from './components/Register';

//二级路由
import Contact from './components/about/Contact';
import Delivery from './components/about/Delivery';
import History from './components/about/History';
import OrderingGuide from './components/about/OrderingGuide';

//三级路由
import Person from './components/About/Person.vue';
import Phone from './components/About/Phone.vue';


export const routes = [{
        path: '/',
        name: 'homeLink',
        components: {
            default: Home,
            'orderingGuide': OrderingGuide,
            'delivery': Delivery,
            'history': History

        }
    },
    { path: '/menu', name: 'menuLink', component: Menu },
    {
        path: '/admin',
        name: 'adminLink',
        component: Admin
            //beforeEnter: (to, from, next) => {
            //路由独享守卫；
            // alert("非登录状态，不能访问此页面！");
            //next(false);
            //判断store.gettes.isLogin===false
            /* if (to.path == '/login' || to.path == '/register') {
                    next(); //执行你要进行的下一步；
                } else {
                    alert('还没有登录，请先登录！');
                    next('/login'); ///指定跳转到某个组件；
                }
            }*/

    },
    {
        path: '/about',
        name: 'aboutLink',
        redirect: '/about/contact',
        component: About,
        children: [{
                path: '/about/contact',
                name: 'contactLink',
                component: Contact,
                children: [
                    { path: '/contact/phone', name: 'phoneNumber', component: Phone },
                    { path: '/contact/person', name: 'personName', component: Person }
                ]
            },
            { path: '/history', name: 'historyLink', component: History },
            { path: '/delivery', name: 'deliveryLink', component: Delivery },
            { path: '/orderingGuide', name: 'orderingGuideLink', component: OrderingGuide },
        ]
    },
    { path: '/login', name: 'loginLink', component: Login },
    { path: '/register', name: 'registerLink', component: Register },
    { path: '*', redirect: '/' }
]