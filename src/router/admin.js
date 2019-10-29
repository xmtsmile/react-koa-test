import Home from '../pages/home/home';
import Article from '../pages/article/article'

const routes = [
    {
        menu: true,
        icon: 'home',
        title: 'Home',
        path: '/admin/home',
        component: Home
    },
    {
        menu: true,
        icon: 'database',
        title: 'Article',
        path: '/admin/article',
        component: Article
    }
];

export default routes;
