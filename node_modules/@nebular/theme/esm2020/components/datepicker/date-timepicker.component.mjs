import { ChangeDetectionStrategy, Component, Inject, Input, Optional, Output, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { NbBasePickerComponent } from './datepicker.component';
import { NB_DATE_SERVICE_OPTIONS } from './datepicker.directive';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-position";
import * as i2 from "../cdk/overlay/overlay-trigger";
import * as i3 from "../cdk/overlay/overlay-service";
import * as i4 from "../calendar-kit/services/date.service";
import * as i5 from "../calendar-kit/services/calendar-time-model.service";
/**
 * The DateTimePicker component itself.
 * Provides a proxy to `NbCalendarWithTimeComponent` options as well as custom picker options.
 */
export class NbDateTimePickerComponent extends NbBasePickerComponent {
    constructor(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions, calendarWithTimeModelService) {
        super(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions);
        this.calendarWithTimeModelService = calendarWithTimeModelService;
        this.pickerClass = NbCalendarWithTimeComponent;
        this.showCurrentTimeButton = true;
    }
    get value() {
        return this.picker ? this.picker.date : undefined;
    }
    set value(date) {
        if (!this.picker) {
            this.queue = date;
            return;
        }
        if (date) {
            this.visibleDate = date;
            this.picker.visibleDate = date;
            this.picker.date = date;
            this.picker.cd.markForCheck();
        }
    }
    /**
     * Defines 12 hours format like '07:00 PM'.
     * */
    get twelveHoursFormat() {
        return this._twelveHoursFormat;
    }
    set twelveHoursFormat(value) {
        this._twelveHoursFormat = convertToBoolProperty(value);
    }
    /**
     * Show seconds in timepicker.
     * Ignored when singleColumn is true.
     * */
    get withSeconds() {
        return this._withSeconds;
    }
    set withSeconds(value) {
        this._withSeconds = convertToBoolProperty(value);
    }
    /**
     * Show timepicker values in one column with 60 minutes step by default.
     * */
    get singleColumn() {
        return this._singleColumn;
    }
    set singleColumn(value) {
        this._singleColumn = convertToBoolProperty(value);
    }
    /**
     * Emits date with time when selected.
     * */
    get dateTimeChange() {
        return this.valueChange;
    }
    ngOnInit() {
        this.format = this.format || this.buildTimeFormat();
    }
    patchWithInputs() {
        this.picker.singleColumn = this.singleColumn;
        this.picker.twelveHoursFormat = this.twelveHoursFormat;
        this.picker.withSeconds = this.withSeconds;
        this.picker.step = this.step;
        this.picker.title = this.title;
        this.picker.applyButtonText = this.applyButtonText;
        this.picker.currentTimeButtonText = this.currentTimeButtonText;
        this.picker.showCurrentTimeButton = this.showCurrentTimeButton;
        if (this.twelveHoursFormat) {
            this.picker.timeFormat = this.dateService.getTwelveHoursFormat();
        }
        else {
            this.picker.timeFormat = this.withSeconds ? this.dateService.getTwentyFourHoursFormatWithSeconds() :
                this.dateService.getTwentyFourHoursFormat();
        }
        super.patchWithInputs();
        this.picker.cd.markForCheck();
    }
    get pickerValueChange() {
        return this.picker.dateChange;
    }
    writeQueue() {
        if (this.queue) {
            const date = this.queue;
            this.queue = null;
            this.value = date;
        }
    }
    buildTimeFormat() {
        if (this.singleColumn) {
            return this.calendarWithTimeModelService.buildDateFormat(this.twelveHoursFormat);
        }
        else {
            return this.calendarWithTimeModelService.buildDateFormat(this.twelveHoursFormat, this.withSeconds);
        }
    }
}
NbDateTimePickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbDateTimePickerComponent, deps: [{ token: NB_DOCUMENT }, { token: i1.NbPositionBuilderService }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbOverlayService }, { token: i0.ComponentFactoryResolver }, { token: i4.NbDateService }, { token: NB_DATE_SERVICE_OPTIONS, optional: true }, { token: i5.NbCalendarTimeModelService }], target: i0.ɵɵFactoryTarget.Component });
NbDateTimePickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: NbDateTimePickerComponent, selector: "nb-date-timepicker", inputs: { step: "step", title: "title", applyButtonText: "applyButtonText", currentTimeButtonText: "currentTimeButtonText", showCurrentTimeButton: "showCurrentTimeButton", twelveHoursFormat: "twelveHoursFormat", withSeconds: "withSeconds", singleColumn: "singleColumn" }, outputs: { dateTimeChange: "dateTimeChange" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbDateTimePickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-date-timepicker',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: i1.NbPositionBuilderService }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbOverlayService }, { type: i0.ComponentFactoryResolver }, { type: i4.NbDateService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NB_DATE_SERVICE_OPTIONS]
                }] }, { type: i5.NbCalendarTimeModelService }]; }, propDecorators: { step: [{
                type: Input
            }], title: [{
                type: Input
            }], applyButtonText: [{
                type: Input
            }], currentTimeButtonText: [{
                type: Input
            }], showCurrentTimeButton: [{
                type: Input
            }], twelveHoursFormat: [{
                type: Input
            }], withSeconds: [{
                type: Input
            }], singleColumn: [{
                type: Input
            }], dateTimeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGUtdGltZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBR1QsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTWxELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBRWpFOzs7R0FHRztBQU1ILE1BQU0sT0FBTyx5QkFBNkIsU0FBUSxxQkFBMkQ7SUFnRjNHLFlBQWlDLFFBQVEsRUFDN0IsZUFBeUMsRUFDekMsc0JBQXVELEVBQ3ZELE9BQXlCLEVBQ3pCLEdBQTZCLEVBQzdCLFdBQTZCLEVBQ2dCLGtCQUFrQixFQUNyRCw0QkFBMkQ7UUFDL0UsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQURwRixpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQStCO1FBcEZ2RSxnQkFBVyxHQUF5QywyQkFBMkIsQ0FBQztRQTRCakYsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBMER0QyxDQUFDO0lBcEZELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1B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QUE3QixLQUFLO2dCQU1GLGlCQUFpQjtzQkFEcEIsS0FBSztnQkFlRixXQUFXO3NCQURkLEtBQUs7Z0JBY0YsWUFBWTtzQkFEZixLQUFLO2dCQWFRLGNBQWM7c0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgTkJfRE9DVU1FTlQgfSBmcm9tICcuLi8uLi90aGVtZS5vcHRpb25zJztcbmltcG9ydCB7IE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktcG9zaXRpb24nO1xuaW1wb3J0IHsgTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktdHJpZ2dlcic7XG5pbXBvcnQgeyBOYk92ZXJsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJUaW1lTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L3NlcnZpY2VzL2NhbGVuZGFyLXRpbWUtbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBOYkRhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L3NlcnZpY2VzL2RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyV2l0aFRpbWVDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdpdGgtdGltZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJCYXNlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOQl9EQVRFX1NFUlZJQ0VfT1BUSU9OUyB9IGZyb20gJy4vZGF0ZXBpY2tlci5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFRoZSBEYXRlVGltZVBpY2tlciBjb21wb25lbnQgaXRzZWxmLlxuICogUHJvdmlkZXMgYSBwcm94eSB0byBgTmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50YCBvcHRpb25zIGFzIHdlbGwgYXMgY3VzdG9tIHBpY2tlciBvcHRpb25zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1kYXRlLXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkRhdGVUaW1lUGlja2VyQ29tcG9uZW50PEQ+IGV4dGVuZHMgTmJCYXNlUGlja2VyQ29tcG9uZW50PEQsIEQsIE5iQ2FsZW5kYXJXaXRoVGltZUNvbXBvbmVudDxEPj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwcm90ZWN0ZWQgcGlja2VyQ2xhc3M6IFR5cGU8TmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50PEQ+PiA9IE5iQ2FsZW5kYXJXaXRoVGltZUNvbXBvbmVudDtcblxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIgPyB0aGlzLnBpY2tlci5kYXRlIDogdW5kZWZpbmVkO1xuICB9XG4gIHNldCB2YWx1ZShkYXRlOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMucGlja2VyKSB7XG4gICAgICB0aGlzLnF1ZXVlID0gZGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZSkge1xuICAgICAgdGhpcy52aXNpYmxlRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnBpY2tlci52aXNpYmxlRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnBpY2tlci5kYXRlID0gZGF0ZTtcbiAgICAgIHRoaXMucGlja2VyLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIG1pbnV0ZXMgc3RlcCB3aGVuIHdlIHVzZSBmaWxsIHRpbWUgZm9ybWF0LlxuICAgKiBJZiBzZXQgdG8gMjAsIGl0IHdpbGwgYmU6ICcxMjowMCwgMTI6MjA6IDEyOjQwLCAxMzowMC4uLidcbiAgICogKi9cbiAgQElucHV0KCkgc3RlcDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFwcGx5QnV0dG9uVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBjdXJyZW50VGltZUJ1dHRvblRleHQ6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd0N1cnJlbnRUaW1lQnV0dG9uID0gdHJ1ZTtcblxuICAvKipcbiAgICogRGVmaW5lcyAxMiBob3VycyBmb3JtYXQgbGlrZSAnMDc6MDAgUE0nLlxuICAgKiAqL1xuICBASW5wdXQoKVxuICBnZXQgdHdlbHZlSG91cnNGb3JtYXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3R3ZWx2ZUhvdXJzRm9ybWF0O1xuICB9XG4gIHNldCB0d2VsdmVIb3Vyc0Zvcm1hdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3R3ZWx2ZUhvdXJzRm9ybWF0ID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfdHdlbHZlSG91cnNGb3JtYXQ6IGJvb2xlYW47XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90d2VsdmVIb3Vyc0Zvcm1hdDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIFNob3cgc2Vjb25kcyBpbiB0aW1lcGlja2VyLlxuICAgKiBJZ25vcmVkIHdoZW4gc2luZ2xlQ29sdW1uIGlzIHRydWUuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIGdldCB3aXRoU2Vjb25kcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fd2l0aFNlY29uZHM7XG4gIH1cbiAgc2V0IHdpdGhTZWNvbmRzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fd2l0aFNlY29uZHMgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF93aXRoU2Vjb25kczogYm9vbGVhbjtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3dpdGhTZWNvbmRzOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogU2hvdyB0aW1lcGlja2VyIHZhbHVlcyBpbiBvbmUgY29sdW1uIHdpdGggNjAgbWludXRlcyBzdGVwIGJ5IGRlZmF1bHQuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIGdldCBzaW5nbGVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NpbmdsZUNvbHVtbjtcbiAgfVxuICBzZXQgc2luZ2xlQ29sdW1uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2luZ2xlQ29sdW1uID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2luZ2xlQ29sdW1uOiBib29sZWFuO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2luZ2xlQ29sdW1uOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogRW1pdHMgZGF0ZSB3aXRoIHRpbWUgd2hlbiBzZWxlY3RlZC5cbiAgICogKi9cbiAgQE91dHB1dCgpIGdldCBkYXRlVGltZUNoYW5nZSgpOiBFdmVudEVtaXR0ZXI8RD4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlIGFzIEV2ZW50RW1pdHRlcjxEPjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTkJfRE9DVU1FTlQpIGRvY3VtZW50LFxuICAgICAgICAgICAgICBwb3NpdGlvbkJ1aWxkZXI6IE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgdHJpZ2dlclN0cmF0ZWd5QnVpbGRlcjogTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgb3ZlcmxheTogTmJPdmVybGF5U2VydmljZSxcbiAgICAgICAgICAgICAgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5CX0RBVEVfU0VSVklDRV9PUFRJT05TKSBkYXRlU2VydmljZU9wdGlvbnMsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBjYWxlbmRhcldpdGhUaW1lTW9kZWxTZXJ2aWNlOiBOYkNhbGVuZGFyVGltZU1vZGVsU2VydmljZTxEPikge1xuICAgIHN1cGVyKGRvY3VtZW50LCBwb3NpdGlvbkJ1aWxkZXIsIHRyaWdnZXJTdHJhdGVneUJ1aWxkZXIsIG92ZXJsYXksIGNmciwgZGF0ZVNlcnZpY2UsIGRhdGVTZXJ2aWNlT3B0aW9ucyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm1hdCA9IHRoaXMuZm9ybWF0IHx8IHRoaXMuYnVpbGRUaW1lRm9ybWF0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGF0Y2hXaXRoSW5wdXRzKCkge1xuICAgIHRoaXMucGlja2VyLnNpbmdsZUNvbHVtbiA9IHRoaXMuc2luZ2xlQ29sdW1uO1xuICAgIHRoaXMucGlja2VyLnR3ZWx2ZUhvdXJzRm9ybWF0ID0gdGhpcy50d2VsdmVIb3Vyc0Zvcm1hdDtcbiAgICB0aGlzLnBpY2tlci53aXRoU2Vjb25kcyA9IHRoaXMud2l0aFNlY29uZHM7XG4gICAgdGhpcy5waWNrZXIuc3RlcCA9IHRoaXMuc3RlcDtcbiAgICB0aGlzLnBpY2tlci50aXRsZSA9IHRoaXMudGl0bGU7XG4gICAgdGhpcy5waWNrZXIuYXBwbHlCdXR0b25UZXh0ID0gdGhpcy5hcHBseUJ1dHRvblRleHQ7XG4gICAgdGhpcy5waWNrZXIuY3VycmVudFRpbWVCdXR0b25UZXh0ID0gdGhpcy5jdXJyZW50VGltZUJ1dHRvblRleHQ7XG4gICAgdGhpcy5waWNrZXIuc2hvd0N1cnJlbnRUaW1lQnV0dG9uID0gdGhpcy5zaG93Q3VycmVudFRpbWVCdXR0b247XG5cbiAgICBpZiAodGhpcy50d2VsdmVIb3Vyc0Zvcm1hdCkge1xuICAgICAgdGhpcy5waWNrZXIudGltZUZvcm1hdCA9IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0VHdlbHZlSG91cnNGb3JtYXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5waWNrZXIudGltZUZvcm1hdCA9IHRoaXMud2l0aFNlY29uZHMgPyB0aGlzLmRhdGVTZXJ2aWNlLmdldFR3ZW50eUZvdXJIb3Vyc0Zvcm1hdFdpdGhTZWNvbmRzKCkgOlxuICAgICAgICB0aGlzLmRhdGVTZXJ2aWNlLmdldFR3ZW50eUZvdXJIb3Vyc0Zvcm1hdCgpO1xuICAgIH1cbiAgICBzdXBlci5wYXRjaFdpdGhJbnB1dHMoKTtcblxuICAgIHRoaXMucGlja2VyLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBwaWNrZXJWYWx1ZUNoYW5nZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5kYXRlQ2hhbmdlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHdyaXRlUXVldWUoKSB7XG4gICAgaWYgKHRoaXMucXVldWUpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnF1ZXVlO1xuICAgICAgdGhpcy5xdWV1ZSA9IG51bGw7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRUaW1lRm9ybWF0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2luZ2xlQ29sdW1uKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxlbmRhcldpdGhUaW1lTW9kZWxTZXJ2aWNlLmJ1aWxkRGF0ZUZvcm1hdCh0aGlzLnR3ZWx2ZUhvdXJzRm9ybWF0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJXaXRoVGltZU1vZGVsU2VydmljZS5idWlsZERhdGVGb3JtYXQodGhpcy50d2VsdmVIb3Vyc0Zvcm1hdCwgdGhpcy53aXRoU2Vjb25kcyk7XG4gICAgfVxuICB9XG59XG5cbiJdfQ==