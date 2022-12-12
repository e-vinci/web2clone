import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const Router = () => {
  onFrontendLoad();
  onNavBarClick();
  onHistoryChange();
};

const routes = {
    '/': HomePage,
    '/login': LoginPage,
    '/register': RegisterPage,
  };

function onNavBarClick() {
  const navItems = document.querySelectorAll('.nav-link');

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const uri = e.target?.dataset?.uri;
        e.preventDefault();
        const componentToRender = routes[uri];
        if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);
        componentToRender();
        window.history.pushState({}, '', uri);
    });
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = window.location.pathname;
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);
    componentToRender();
  });
}

export default Router;
