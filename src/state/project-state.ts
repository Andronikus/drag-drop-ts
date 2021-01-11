import {Project, ProjectStatus} from '../model/project-model.js';

// State
type ListenerFn<T> = (items: T[]) => void;

abstract class Listener<T> {

    protected listeners: ListenerFn<T>[] = [];

    constructor() {}

    registerListener(listener: ListenerFn<T>){
        this.listeners.push(listener);
    }
}

class ProjectState extends Listener<Project>{

    private projects: Project[] = [];
    private static instance: ProjectState;

    constructor(){
        super();
    }

    static getInstance(){
        if(!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }

    addProject(project: Project){
        this.projects.push(project);
        this.notify();
    }

    switchProject(projectId: string, newStatus: ProjectStatus){
        const prjToSwitch = this.projects.find( prj => prj.id === projectId);

        if(prjToSwitch && prjToSwitch.status !== newStatus){
            prjToSwitch.status = newStatus;
            this.notify();
        }
    }

    private notify(){
        if(this.listeners.length > 0){
            const copyOfState = this.projects.slice();
            this.listeners.forEach(listener => {
                listener(copyOfState);
            })
        }
    }
}

export const projectState = ProjectState.getInstance();