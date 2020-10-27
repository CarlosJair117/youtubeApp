import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyDCxHW_6D_rNELzPOBPZKQ5T1yHZnd2wmQ';
  private playlist = 'UUNYW2vfGrUE6R5mIJYzkRyQ';
  private nextPageToken = '';

  constructor( private http: HttpClient) {  }

  getVideos() {

    const url = `${this.youtubeUrl}/playlistItems`

    const params = new HttpParams() 
        .set('part', 'snippet')
        .set('maxResults', '15')
        .set('playlistId', this.playlist)
        .set('key', this.apikey)
        .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>( url, {params})
               .pipe(
                 map( resp => {
                   this.nextPageToken = resp.nextPageToken;
                   return resp.items;
                 }),

                 map( items => items.map( video => video.snippet) )
               )
  }
}
