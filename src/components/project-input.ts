import { Component } from './base-component';
import { Validatable, validate} from '../utils/validation';
import { AutoBind } from '../decorators/decorators';
import { Project, ProjectStatus } from '../model/project-model';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
 
    private titleInputEl: HTMLInputElement;
    private descriptionInputEl: HTMLInputElement;
    private peopleInputEl: HTMLInputElement;

    constructor(){
        super('project-input', 'app',true,'user-input');

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.renderContent();
        this.configure();
    }

    private cleanInputValues(){
        this.titleInputEl.value = '';
        this.descriptionInputEl.value = '';
        this.peopleInputEl.value = '';
    }

    private geatherInputValues(): [string, string, number] | void{

        const title = this.titleInputEl.value;
        const description = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;

        const titleValidatable: Validatable = {value: title, minLength:5, maxLength: 10};
        const descValidatable: Validatable = {value: description, minLength:5, maxLength: 100};
        const peopleValidatable: Validatable = {value: +people, min:1, max: 10};


        if(!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)){
            alert('Invalid input!');
            return;
        }

        return [title, description, +people];

    }

    @AutoBind
    private submitHandler(event: Event){
        event.preventDefault();

        const inputValues = this.geatherInputValues();

        if(Array.isArray(inputValues)){
            const [title, description, people] = inputValues;
            const newProjet = new Project(Math.ceil(Math.random()).toString(), title, description,people, ProjectStatus.active);
            projectState.addProject(newProjet)
            this.cleanInputValues();
        }
    }

    configure(){
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(){}
}