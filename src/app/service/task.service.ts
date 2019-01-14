import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";

import {HttpUtilService} from "./http-util.service";
import {Task} from "../model/task";

@Injectable()
export class TaskService {

    private servico: string = 'task';

    constructor(private http: Http, private httpUtil: HttpUtilService) {
    }

    getTasks(): Observable<Task[]> {
        // let listaStub: Task[] = REQUEST_TASK.data;
        // return Observable.of(listaStub).delay(1000);
        return this.http.get(this.httpUtil.url(this.servico))
            .map(this.httpUtil.extrairDados)
            .catch((e) => this.httpUtil.processarErros(e));
    }

    adicionarTask(task: Task): Observable<Task[]> {
        var param = {
            "task": {
                "id": 0,
                "dtCriacao": null,
                "titulo": task.titulo,
                "descricao": task.descricao,
                "concluida": task.concluida
            }
        };
        return this.http.post(this.httpUtil.url(this.servico), param)
            .map(this.httpUtil.extrairResponse)
            .catch((e) => this.httpUtil.processarErros(e));
    }

    editarTask(task: Task): Observable<Task[]> {
        var param = {
            "task": {
                "id": task.id,
                "dtCriacao": null,
                "titulo": task.titulo,
                "descricao": task.descricao,
                "concluida": task.concluida
            }
        };
        return this.http.put(this.httpUtil.url(this.servico), param)
            .map(this.httpUtil.extrairResponse)
            .catch((e) => this.httpUtil.processarErros(e));
    }

    excluirTask(task: Task): Observable<any> {
        return this.http.delete(this.httpUtil.url(this.servico + '/' + task.id))
            .map(this.httpUtil.extrairResponse)
            .catch((e) => this.httpUtil.processarErros(e));
    }


}
