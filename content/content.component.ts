import { Component, OnInit, HostListener } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CommonServiceComponent } from '../common-service/common-service.component';
import { faBars, faSort, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfigEditComponent } from '../shared/config-edit/config-edit.component';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ContentComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs = [];
  rowData = [];
  gridApi: any;
  gridColumnApi: any;
  allColumnIds = [];
  // importing fontAwesome icons
  faBars = faBars;
  faSort = faSort;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private commonService: CommonServiceComponent) { }
  ngOnInit() {
    //defining gridOption configuration properties of Ag-grid
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      rowHeight: 32,
      rowBuffer: 200,
      suppressNoRowsOverlay: false,
      suppressCellSelection: true,
      resizable: true,
      context: {
        componentParent: this
      },
      suppressMovableColumns: true
    };
    //assigning column headers to Ag-grid column definations
    this.columnDefs = [
      { headerName: 'Rank', field: 'rank', sortable: true, width: 80 },
      { headerName: 'Name', field: 'name', filter: true, editable: true, singleClickEdit: true },
      { headerName: 'Platform', field: 'platform', editable: true, singleClickEdit: true },
      { headerName: 'Year', field: 'year', sortable: true, width: 80 },
      { headerName: 'Genre', field: 'genre', editable: true, singleClickEdit: true },
      { headerName: 'Publisher', field: 'publisher', filter: true, editable: true, singleClickEdit: true },
      { headerName: 'Global_Sales', field: 'global_sales', editable: true, singleClickEdit: true },
      {
        headerName: 'Action', field: 'action', cellRendererFramework: ConfigEditComponent,
        cellStyle: { 'text-align': 'center!important' }, width: 100
      }
    ];
    //property added to show loader gif when data is being fetched
    this.gridOptions.localeText = {
      noRowsToShow: `<span style="vertical-align: middle;">
        <img style="width:25px;height:25px;" src="/assets/images/spinner.gif">
        <span style="color: #747c89; font-size: 15px;">&nbsp Top games are being fetched...</span>
      </span>` };
  }
  //method is called by angular when ag grid is ready i.e., grid is drawn
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.getAllColumns().forEach((column) => this.allColumnIds.push(column.colId));
    this.gridApi.hideOverlay();
    //initial sizing of grid according to window width
    if (window.innerWidth > 720) {
      this.gridApi.sizeColumnsToFit();
    } else {
      this.gridColumnApi.autoSizeColumns(this.allColumnIds);
    }
    //adding rows to the grid
    if (this.commonService.getTopGames().length > 0) {
      this.commonService.getTopGames().forEach((game) => {
        if (game.Rank) {
          var rowDataLocal = {
            rank: game.Rank,
            name: game.Name,
            platform: game.Platform,
            year: game.Year,
            genre: game.Genre,
            publisher: game.Publisher,
            global_sales: game.Global_Sales
          };
          this.rowData.push(rowDataLocal);
        }
      });
    } else {
      //display message when no data is present
      this.gridOptions.localeText = { noRowsToShow: "No Games To Show" };
    }
    //method call for writing rowData to grid
    this.gridApi.setRowData(this.rowData);
  }
  //method is called from ConfigEditComponent when trash Icon is clicked
  //used to remove rows from the grid
  onRemoveClicked(removedGame) {
    const removedIndex = this.rowData.findIndex((item) => item.rank === removedGame.rank);
    this.rowData.splice(removedIndex, 1);
    this.gridApi.setRowData(this.rowData);
  }
  //method is called from ConfigEditComponent when edit/save Icon is clicked
  //used to start/stop editing in the grid
  enableEditableFields(isEnable: boolean, rowIndex) {
    if (isEnable) {
      this.gridOptions.api.setFocusedCell(rowIndex, "name");
      this.gridApi.startEditingCell({
        rowIndex: rowIndex,
        colKey: "name"
      });
    } else {
      this.gridApi.stopEditing();
    }
  }
  //used to readjust the column width and redraw the grid according to screen resizing
  onResize(event) {
    console.log('targetWidth: ', event.target.innerWidth);
    if (event.target.innerWidth > 720) {
      this.gridApi.sizeColumnsToFit();
    } else {
      this.gridColumnApi.autoSizeColumns(this.allColumnIds);
    }
  }
}
