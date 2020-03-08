import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonServiceComponent } from '../common-service/common-service.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let commonService: CommonServiceComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let params: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule
      ],
      providers: [CommonServiceComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    commonService = fixture.debugElement.injector.get(CommonServiceComponent);
    params = {
      api: {
        hideOverlay: () => '',
        sizeColumnsToFit: () => '',
        setRowData: (data) => console.log(data)
      },
      columnApi : {
        getAllColumns: () => [],
        autoSizeColumns: (params) => console.log(params)
      },
      data: {
        "rank": "15520",
        "name": "X-Plane 10 Global",
        "platform": "PC",
        "year": "2013",
        "genre": "Simulation",
        "publisher": "Aerosoft",
        "global_sales": "0.02"
      },
      node: {
        rowIndex: 1
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the grid ready and load grid row data if games are present', () => {
    // Arrange
    // component.params = params;
    const spy = spyOn(commonService, 'getTopGames').and.returnValue([
      {
        "Rank": "15520",
        "Name": "X-Plane 10 Global",
        "Platform": "PC",
        "Year": "2013",
        "Genre": "Simulation",
        "Publisher": "Aerosoft",
        "Global_Sales": "0.02",
        "": ""
      }
    ]);
    // Act
    component.onGridReady(params);
    fixture.detectChanges();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.rowData).toEqual([params.data]);
  });
  it('should get the grid ready and show no games to show, if games are not present ', () => {
    // Arrange
    const spy = spyOn(commonService, 'getTopGames').and.returnValue([]);
    const noRowsObj = { noRowsToShow: 'No Games To Show' };
    // Act
    component.onGridReady(params);
    fixture.detectChanges();
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component.gridOptions.localeText).toEqual(noRowsObj);
  });
  it('should get the grid ready and show no games to show, if games are not present ', () => {
    // Arrange
    const mockData = [{
      "rank": "15525",
      "name": "WRC 2: FIA World Rally Championship",
      "platform": "PC",
      "year": "2011",
      "genre": "Racing",
      "publisher": "Ubisoft",
      "global_Sales": "0.02"
    },
    {
      "rank": "15526",
      "name": "uDraw Studio: Instant Artist",
      "platform": "X360",
      "year": "2011",
      "genre": "Misc",
      "publisher": "THQ",
      "global_Sales": "0.02"
    }];
    component.gridApi = params.api;
    component.rowData = mockData;
    const removeMockData = Object.assign({}, mockData[0]);
    // Act
    component.onRemoveClicked(removeMockData);
    fixture.detectChanges();
    // Assert, row data length after removal reduces to 1
    expect(component.rowData.length).toEqual(1);
  });
});
