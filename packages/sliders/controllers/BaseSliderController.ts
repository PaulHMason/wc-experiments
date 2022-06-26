import { ReactiveController, ReactiveControllerHost } from 'lit';

export abstract class BaseSliderController implements ReactiveController {
    private host: ReactiveControllerHost;

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this);
    }
    
    hostConnected() {
        // TODO
    }

    hostDisconnected() {
        // TODO
    }
}
