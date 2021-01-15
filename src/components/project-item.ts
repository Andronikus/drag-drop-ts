import { Component } from './base-component';
import { Draggable, Project } from '../model/project-model';
import { AutoBind } from '../decorators/decorators';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{

    private project: Project;

    get getPeople(): string{
        let people;

        if(this.project.people === 1){
            people = `1 person`;
        }else {
            people = `${this.project.people} persons`;
        }

        return people;
    }
    
    constructor(hostId: string, project: Project){
        super('single-project', hostId,false, project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent){
        event.dataTransfer!.setData('text/plain',this.project.id);
        event.dataTransfer!.effectAllowed ="move";

        console.log(event);

        //document.getElementById(this.project.id)?.classList.add('project__item-drag');
    }

    @AutoBind
    dragEndHandler(event: DragEvent){
        console.log('dragEndHandler',event);
    }
    
    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent(){
        this.element.id = this.project.id;
        this.element.setAttribute('draggable', 'true');
        this.element.querySelector('h1')!.innerText = this.project.title;
        this.element.querySelector('h3')!.innerText = this.getPeople + ' assigned!';
        this.element.querySelector('p')!.innerText = this.project.description;
        this.element.classList.add('project__item');
    }
}
