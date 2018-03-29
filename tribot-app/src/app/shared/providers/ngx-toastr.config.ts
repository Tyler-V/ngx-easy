
import { GlobalConfig, Toast } from 'ngx-toastr';

export class NgxToastrConfig implements GlobalConfig {
    // Global
    maxOpened = 0;
    autoDismiss = false;
    newestOnTop = true;
    preventDuplicates = false;
    iconClasses = {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
    };

    // Individual
    toastComponent = Toast;
    closeButton = false;
    disableTimeOut = false;
    timeOut = 3000;
    extendedTimeOut = 1000;
    enableHtml = false;
    progressBar = true;
    toastClass = 'toast';
    positionClass = 'toast-top-right';
    titleClass = 'toast-title';
    messageClass = 'toast-message';
    easing = 'ease-in-out';
    easeTime = 300;
    tapToDismiss = true;
    onActivateTick = false;
    progressAnimation: 'decreasing' | 'increasing' = 'decreasing';
}

export const ngxToastrConfig = new NgxToastrConfig();
