import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpUtilService {

    public static API_URL: string = 'http://grandev.com.br/tasklist-back/api/';

    url(path: string) {
        return HttpUtilService.API_URL + path;
    }

    extrairResponse(response: Response) {
        return response;
    }

    extrairDados(response: Response) {
        let data = response.json();
        return data || {};
    }

    processarErros(erro: Response | any) {
        console.log('erro.status: ' + erro.status);
        switch (erro.status) {
            case 400:
                erro = '400 - Requisição inválida.';
                break;
            case 401:
                erro = '401 - O recurso requisitado não foi autorizado.';
                break;
            case 403:
                erro = '403 - Recurso requisitado proibido.';
                break;
            case 404:
                erro = '404 - O recurso requisitado não existe.';
                break;
            case 405:
                erro = '405 - Método não permitido.';
                break;
            case 500:
                erro = '500 - Ocorreu um erro inesperado.';
                break;
        }
        console.error(erro);
        return Observable.throw('Erro: ' + erro);
    }
}
