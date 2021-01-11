export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    private template: HTMLTemplateElement;
    protected rootElement: T;
    protected element: U;

    constructor(templateElementId: string, rootElementId: string, insertAtStart: boolean, newElementId?: string){
        this.template = document.getElementById(templateElementId)! as HTMLTemplateElement;
        this.rootElement = document.getElementById(rootElementId)! as T;

        const importedNode = document.importNode(this.template.content,true);
        this.element = importedNode.firstElementChild as U;

        if(newElementId){
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    abstract renderContent():void;
    abstract configure():void;

    private attach(insertAtStart: boolean) {
        const insertPosition = insertAtStart ? 'afterbegin' : 'beforeend';
        this.rootElement.insertAdjacentElement(insertPosition,this.element);
    }
}