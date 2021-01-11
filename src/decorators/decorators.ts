export function AutoBind(target: any, propertyName: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;

    const bindDescriptor: PropertyDescriptor = {
        enumerable: false,
        configurable: true,
        get(){
            return originalMethod.bind(this);
        }
    }

    return bindDescriptor;
}