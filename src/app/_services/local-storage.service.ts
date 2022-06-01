import { Inject, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
  anotherTodolist = [];
    private functionName = 'LocalStorageService';



    constructor(private logger: NGXLogger,
                @Inject(LOCAL_STORAGE) private storage: StorageService) {
        this.logger.debug(this.functionName + '.constructor()');
    }


    public storeOnLocalStorage(taskTitle: string): void {
        this.logger.debug(this.functionName + '.storeOnLocalStorage()');

        // get array of tasks from local storage
        const currentTodoList = this.storage.get('STORAGE_KEY') || [];

        // push new task to array
        currentTodoList.push({
            title: taskTitle,
            isChecked: false
        });

        // insert updated array to local storage
        this.storage.set('STORAGE_KEY', currentTodoList);

        console.log(this.storage.get('STORAGE_KEY') || 'LocaL storage is empty');

        this.storage.remove('STORAGE_KEY');
    }
}
