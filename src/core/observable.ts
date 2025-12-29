/**
 * standard Observer interface.
 */
export interface Observer<T> {
    next: (value: T) => void;
    error?: (err: any) => void;
    complete?: () => void;
}

/**
 * A handle to cancel the subscription.
 */
export interface Subscription {
    unsubscribe: () => void;
}

/**
 * A lightweight, dependency-free implementation of the Observable pattern.
 * Designed to handle asynchronous data streams (e.g., live traffic updates)
 * without the overhead of full RxJS.
 */
export class Observable<T> {
    private subscribers: Observer<T>[] = [];

    /**
     * @param setup A function that is executed when a consumer subscribes. 
     *              It should return a teardown logic function (e.g., clearInterval).
     */
    constructor(
        private setup: (observer: Observer<T>) => (() => void) | void
    ) { }

    public subscribe(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): Subscription {
        const observer: Observer<T> = { next, error, complete };
        this.subscribers.push(observer);

        // Lazy Initialization: The setup logic runs for *each* subscriber.
        // This creates a "Cold Observable" behavior where resources are allocated per subscription.
        let teardown: (() => void) | void;

        try {
            teardown = this.setup(observer);
        } catch (e) {
            if (observer.error) observer.error(e);
        }

        // Return the Unsubscribe handle (Teardown)
        return {
            unsubscribe: () => {
                this.subscribers = this.subscribers.filter(s => s !== observer);
                if (teardown) teardown();
            }
        };
    }
}
