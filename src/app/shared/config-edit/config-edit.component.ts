import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent implements ICellRendererAngularComp {
  public params: any;
  rowIndex: any;
  rank: any
  isFieldsEditable = false;
  // importing fontAwesome icons
  faEdit = faEdit;
  faSave = faSave;
  faTrash = faTrash;
  constructor() { }
  agInit(params): void {
    this.params = params;
    this.rank = this.params.data.rank;
  }
  // calling method to remove row from the grid
  onRemove() {
    this.params.context.componentParent.onRemoveClicked(this.params.data);
  }
  // calling method to start/stop editing in the grid
  onEdit(imgClicked: string) {
    if (imgClicked === 'edit') {
      this.params.context.componentParent.enableEditableFields(true, this.params.node.rowIndex);
    } else {
      this.params.context.componentParent.enableEditableFields(false, this.params.node.rowIndex);
    }
    this.isFieldsEditable = !this.isFieldsEditable;
  }

  refresh(): boolean {
    return false;
  }

}