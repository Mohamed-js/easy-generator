import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger {
    setContext(context: string) {
        this.context = context;
    }

    log(message: string, context?: string) {
        super.log(message, this.context || context);
    }

    error(message: string, trace?: string, context?: string) {
        super.error(message, trace, this.context || context);
    }

    warn(message: string, context?: string) {
        super.warn(message, this.context || context);
    }

    debug(message: string, context?: string) {
        super.debug(message, this.context || context);
    }

    verbose(message: string, context?: string) {
        super.verbose(message, this.context || context);
    }
}
