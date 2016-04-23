import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

export enum ShaderType { vert, frag };

export class Shader {
    constructor(private _type: ShaderType, private _text: string) { }

    text() { return this._text; }
}

@Injectable()
export class ShaderService {

    constructor(private _http: Http) { }

    getShader(type: ShaderType, path: string) {
        return this._http.get(path)
            .map((response: Response) => new Shader(type, response.text()))
            .do(shader => console.log(shader))
            .catch(this.handleError);
    }

    private handleError(err: Response) {
        console.error(err);
        return Observable.throw(err.json().error || 'Error loading shader');
    }

}
