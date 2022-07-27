import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../models/report.model";
import {Event} from "../models/event.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {User} from "../models/user.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Group} from "../models/group.model";
import {MediaService} from "../media/media.service";
import {CreateEventDto} from "../models/dto/create_event.dto";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private authService: AuthService, private mediaService: MediaService) {
  }

  // Get
  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${environment.apiBaseUrl}/event/${id}`)
  }

  getByName(name: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/searchByName/${name}`)
  }

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/`)
  }

  getAllNotEndEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/notEnd`)
  }

  getEventParticipation(id, limit, offset): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/participation/${id}/${offset}/${limit}`)
  }

  getEventParticipant(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/participant/${eventId}`)
  }

  getOwner(eventId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/event/owner/${eventId}`)
  }

  getGroupOwner(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/event/groupOwner/${eventId}`)
  }

  isOwner(eventId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/event/isOwner/${eventId}`)
  }

  isMember(eventId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/event/isMember/${eventId}`)
  }

  async createEvent(newEvent: FormGroup, exerciseTemplates: FormControl, group: Group, picture?: File) {
    const formData = new CreateEventDto();
    formData.name = newEvent.value.name;
    formData.description = newEvent.value.description;
    formData.startDate = newEvent.value.startDate;
    formData.endDate = newEvent.value.endDate;
    formData.exerciseTemplates = exerciseTemplates.value;
    if (group) {
      formData.group = group;
    }
    return this.http.post<Event>(`${environment.apiBaseUrl}/event/`, formData).subscribe({
      next: createdEvent => {
        if (picture) {
          this.mediaService.saveEventPicture(createdEvent.id, picture).subscribe({
            next: () => {
            },
            error: err => {
              if (!environment.production) {
                console.log(err)
              }
            }
          });
        }
        return createdEvent;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  // TODO: Mettre en place l'ajout d'exercise
  updateEvent(newEvent: FormGroup, file: File, group: Group): Observable<any> {
    let formData = new FormData();
    formData.append("name", newEvent.value.name);
    formData.append("description", newEvent.value.description);
    formData.append("startDate", newEvent.value.startDate.toString());
    formData.append("endDate", newEvent.value.endDate.toString());
    formData.append("participantsLimit", newEvent.value.participantsLimit.toString())
    // TODO: il vas surement y avoir un problème avec le faite que languages est un tableau

    formData.append("languages", newEvent.value.languages);
    if (group) {
      formData.append("group", group.id);
    }
    if (file) {
      this.mediaService.saveEventPicture(group.id, file);
    }
    return this.http.put<Event>(`${environment.apiBaseUrl}/event/`, formData);
  }

  deleteEvent(id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/event/${id}`)
  }

  addParticipant(eventId: string, userId: string) {
    return this.http.post(`${environment.apiBaseUrl}/event/participant/${eventId}/${userId}`, null)
  }

  removeParticipant(eventId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/event/participant/${eventId}/${userId}`, null)
  }

  addExercise(eventId: string, exerciseId: string) {
    return this.http.post(`${environment.apiBaseUrl}/event/exercise/${eventId}/${exerciseId}`, null)
  }

  removeExercise(eventId: string, exerciseId: string) {
    return this.http.put(`${environment.apiBaseUrl}/event/exercise/${eventId}/${exerciseId}`, null)
  }

  sendReport(id: string, report: Report) {
    return this.http.post<any>(`${environment.apiBaseUrl}/report/event`, report)
  }

  getEventWithGroupId(id: string, limitEvent: number, offsetEvent: number) {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/group/${id}/${offsetEvent}/${limitEvent}`)
  }
}
