import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEditComponent } from './config-edit.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContentComponent } from 'src/app/content/content.component';

describe('ConfigEditComponent', () => {
  let component: ConfigEditComponent;
  let contentComponent: ContentComponent;
  let fixture: ComponentFixture<ConfigEditComponent>;
  let fixtureContentComponent: ComponentFixture<ContentComponent>;
  let params : any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigEditComponent, ContentComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigEditComponent);
    fixtureContentComponent = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    contentComponent = fixtureContentComponent.componentInstance;
    params = {
      context : {
        componentParent: contentComponent
      },
      data : {
            "Rank": "15520",
            "Name": "X-Plane 10 Global",
            "Platform": "PC",
            "Year": "2013",
            "Genre": "Simulation",
            "Publisher": "Aerosoft",
            "Global_Sales": "0.02",
            "": ""
      },
      node : {
        rowIndex: 1
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Case Methods onRemove, onEdit
  it('should remove row from grid', () => {
    // Arrange
    component.params = params;
    const spy = spyOn(contentComponent, 'onRemoveClicked').and.returnValue();
    // Act
    component.onRemove();
    fixture.detectChanges();
    // Assert
    expect(spy).toHaveBeenCalledWith(params.data);
  });
  it('should start/stop editing in grid rows', () => {
    // Arrange
    component.params = params;
    component.isFieldsEditable = false;
    const spy = spyOn(contentComponent, 'enableEditableFields').and.returnValue();
    // Act
    component.onEdit('edit');
    fixture.detectChanges();
    // Assert
    // Check if spy is called
    expect(spy).toHaveBeenCalledWith(true, params.node.rowIndex);
    // if method gets called isFieldEditable toggles
    expect(component.isFieldsEditable).toEqual(true);
  });
});
