type TInitializeFunc = (container: IoCContainer) => any;

export class IoCContainer {
  private _services = new Map<string, any>();

  register(name: string, initializer: TInitializeFunc): IoCContainer {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this._services.has(name)) {
          const module = typeof initializer === 'function' ? initializer(this) : initializer
          this._services.set(name, module);
        }

        return this._services.get(name);
      },
      configurable: true,
      enumerable: true,
    });

    return this;
  }
}

export function createContainer(): IoCContainer {
  return new IoCContainer();
}
