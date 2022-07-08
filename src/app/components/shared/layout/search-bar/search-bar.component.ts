import {Component} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from "@angular/forms";
import {SearchResponseDto} from "../../../../services/models/dto/custom/search-response.dto";
import {SearchService} from "../../../../services/search/search.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  faSearch = faSearch;
  searchControl = new FormControl();
  searchResult: SearchResponseDto;

  constructor(private searchService: SearchService) {
  }

  searchData($event: any): void {
    if ($event.target.value === undefined || $event.target.value === '') {
      this.searchResult = undefined;
      return;
    }
    firstValueFrom(this.searchService.search($event.target.value))
      .then(searchResult => {
        this.searchResult = searchResult
      });
  }


}
