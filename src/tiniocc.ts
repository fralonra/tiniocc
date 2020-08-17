type TInitializeFunc = (container: IoCContainer) => any;

export class IoCContainer {
  private _deps = new Array<string>();
  private _services = new Map<string, any>();

  register(name: string, initializer: TInitializeFunc): IoCContainer {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this._services.has(name)) {
          if (this._deps.indexOf(name) > -1) {
            throw new Error('Circular dependency detected.');
          }
          this._deps.push(name);
          const module = typeof initializer === 'function' ? initializer(this) : initializer
          this._services.set(name, module);
          this._deps.pop();
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
