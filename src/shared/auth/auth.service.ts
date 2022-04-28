import { Injectable } from "@angular/core";
import { PolicyInstance } from "@bi-meta/policy/models/policy-instance";


@Injectable()
export class AuthService implements PolicyInstance{

    protected roleLists = [
        'ROLES_USER'
    ]


    get roles(): string[] {
        return this.roleLists
    }
}
