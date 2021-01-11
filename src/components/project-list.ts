import { Component } from './base-component.js';
import { DragTarget, Project, ProjectStatus } from '../model/project-model.js';
import { AutoBind } from '../decorators/decorators.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    
    constructor(private type: 'active' | 'finished'){
       
        super('project-list','app',false, `${type}-projects`);

        const heading = this.element.querySelector('h2')! as HTMLHeadingElement;
        heading.innerText = `${this.type} projects`.toUpperCase();
        const unorderList = this.element.querySelector('ul')! as HTMLUListElement;

        unorderList.id = `${type}-projects-list`;

        this.renderContent();
        this.configure();
    }

    @AutoBind
    dragOverHandler(event: DragEvent){

        if(event.dataTransfer?.types[0] === 'text/plain'){
            event.preventDefault();
            const ulElem = this.element.querySelector('ul')! as HTMLUListElement;
            ulElem.classList.add('droppable');
        }
    }

    @AutoBind
    dragLeaveHandler(event: DragEvent){
        const ulElem = this.element.querySelector('ul')! as HTMLUListElement;
        ulElem.classList.remove('droppable');
    }

    @AutoBind
    dropHandler(event: DragEvent){
        event.preventDefault();
        const projectId = event.dataTransfer?.getData('text/plain');

        if(projectId){
            const projectType = this.type === 'active' ?  ProjectStatus.active : ProjectStatus.finished;
            projectState.switchProject(projectId,projectType);
        }
    }

    configure(){
        projectState.registerListener( (projects: Project[]) => {
            
            const ulElem = document.querySelector(`#${this.type}-projects ul`)! as HTMLUListElement;

            const prj = projects.filter( project => {
                if(this.type === 'active'){
                    return project.status === ProjectStatus.active;
                }

                return project.status === ProjectStatus.finished;
            } );

            ulElem.innerHTML = '';

            prj.forEach( (project) => {
                new ProjectItem(`${this.type}-projects-list`,project)
            })
        });

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }

    renderContent(){}
}