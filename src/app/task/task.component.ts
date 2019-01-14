import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {TaskService} from "../service/task.service";
import {Task} from "../model/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SortableComponent} from "ngx-bootstrap";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['task.component.css']
})
export class TaskComponent implements OnInit {

    public tasks: Task[] = [];
    public taskSelecionada: Task = new Task();
    public indexSelecionado: number;
    @ViewChild('modalAdicionar')
    public modalAdicionar: ModalDirective;
    @ViewChild('modalVisualizar')
    public modalVisualizar: ModalDirective;
    @ViewChild('modalEditar')
    public modalEditar: ModalDirective;
    public modalExcluirConfirm: BsModalRef;
    @ViewChild(SortableComponent)
    public sortableComponent: SortableComponent;
    public msgErro: string;

    public taskForm = new FormGroup({
        titulo: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        concluida: new FormControl('')
    });

    constructor(private taskService: TaskService, private modalService: BsModalService) {
    }

    ngOnInit() {
        this.getTasks();
    }

    private getTasks() {
        this.taskService.getTasks().subscribe(
            response => this.processarTasks(response),
            error => this.msgErro = error);
    }

    private processarTasks(response: Task[]) {
        this.tasks = response;
    }

    public clickAdicionarTask() {
        this.taskForm.reset(new Task());
        this.showModalAdicionar();
    }

    public clickVisualizarTask(taskSelecionada: Task) {
        this.setValues(taskSelecionada);
        this.showModalVisualizar();
    }

    public clickEditarTask(taskSelecionada: Task) {
        this.setValues(taskSelecionada);
        this.showModalEditar();
    }

    public clickExcluirTask(taskSelecionada: Task, index: number, template: TemplateRef<any>) {
        console.log('excluirTask ' + taskSelecionada.titulo);
        console.log('index ' + index);
        this.taskSelecionada = taskSelecionada;
        this.indexSelecionado = index;
        this.showExcluirConfirm(template);
    }

    private removeItem() {
        if (this.indexSelecionado > -1) {
            this.tasks.splice(this.indexSelecionado, 1);
            this.sortableComponent.writeValue(this.tasks);
        }
    }

    private setValues(taskSelecionada: Task) {
        this.taskSelecionada = taskSelecionada;
        this.taskForm.setValue({
            titulo: this.taskSelecionada.titulo,
            descricao: this.taskSelecionada.descricao,
            concluida: this.taskSelecionada.concluida
        });
    }

    public showModalAdicionar(): void {
        this.modalAdicionar.show();
    }

    public hideModalAdicionar(): void {
        this.modalAdicionar.hide();
    }

    public showModalVisualizar(): void {
        this.modalVisualizar.show();
    }

    public hideModalVisualizar(): void {
        this.modalVisualizar.hide();
    }

    public showModalEditar(): void {
        this.modalEditar.show();
    }

    public hideModalEditar(): void {
        this.modalEditar.hide();
    }

    public showExcluirConfirm(template: TemplateRef<any>) {
        this.modalExcluirConfirm = this.modalService.show(template, {class: 'modal-sm'});
    }

    public confirm(): void {
        this.modalExcluirConfirm.hide();
        this.taskService.excluirTask(this.taskSelecionada).subscribe(
            response => this.processarExcluirTask(response),
            error => this.msgErro = error);
    }

    private processarExcluirTask(response: any) {
        if (response.status === 204) {
            this.removeItem();
        } else {
            this.msgErro = 'Erro ao tentar exluir task';
            console.log(this.msgErro);
        }
    }

    public decline(): void {
        this.modalExcluirConfirm.hide();
    }

    public adicionarTask() {
        console.log(this.taskForm.value);
        let task: Task = new Task();
        task.titulo = this.taskForm.value.titulo;
        task.descricao = this.taskForm.value.descricao;
        task.concluida = (this.taskForm.value.concluida ? true : false);
        this.taskService.adicionarTask(task).subscribe(
            response => this.processarAdicionarTask(response),
            error => this.msgErro = error);
    }

    private processarAdicionarTask(response: any) {
        if (response.status === 201) {
            this.hideModalAdicionar();
            window.location.reload();
        } else {
            this.msgErro = 'Erro ao tentar adicionar task';
            console.log(this.msgErro);
        }
    }

    public editarTask() {
        console.log(this.taskForm.value);
        let task: Task = new Task();
        task.id = this.taskSelecionada.id;
        task.titulo = this.taskForm.value.titulo;
        task.titulo = this.taskForm.value.titulo;
        task.descricao = this.taskForm.value.descricao;
        task.concluida = (this.taskForm.value.concluida ? true : false);
        this.taskService.editarTask(task).subscribe(
            response => this.processarEditarTask(response),
            error => this.msgErro = error);
    }

    private processarEditarTask(response: any) {
        if (response.status === 200) {
            this.hideModalEditar();
            window.location.reload();
        } else {
            this.msgErro = 'Erro ao tentar editar task';
            console.log(this.msgErro);
        }
    }

}
