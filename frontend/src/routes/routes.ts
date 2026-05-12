import config from '~/config';
import * as Pages from '~/pages';
import * as Layouts from '~/layouts';
import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';

const routes = [
    { path: config.routes.default, component: Pages.Dashboard, layout: Layouts.default, protected: ProtectedRoute, title: 'Dashboard' },
    { path: config.routes.login, component: Pages.Login, layout: Layouts.LoginLayout, guest: GuestRoute, title: 'Đăng nhập' },
    { path: config.routes.register, component: Pages.Register, layout: Layouts.LoginLayout, guest: GuestRoute, title: 'Đăng ký' },
    { path: config.routes.dashboard, component: Pages.Dashboard, layout: Layouts.default, protected: ProtectedRoute, title: 'Dashboard' },
    {
        path: config.routes.editProfile,
        component: Pages.EditProfile,
        layout: Layouts.default, protected: ProtectedRoute,
        title: 'Cài đặt'
    },
    { path: config.routes.pending, component: Pages.PendingTask, layout: Layouts.default, protected: ProtectedRoute, title: 'Task chờ xử lý' },
    {
        path: config.routes.completed,
        component: Pages.CompletedTask,
        layout: Layouts.default, protected: ProtectedRoute,
        title: 'Task hoàn tất'
    },
];

export default routes;
