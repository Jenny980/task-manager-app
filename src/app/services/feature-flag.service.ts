import { Injectable } from '@angular/core';
import { fetchAndActivate, getBoolean, getValue } from 'firebase/remote-config';
import { remoteConfig } from '../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  async isFilterEnabled(): Promise<boolean> {
    try {
      await fetchAndActivate(remoteConfig); 
      const flag = getValue(remoteConfig, 'filter_enabled');
      return flag.asBoolean();
    } catch (error) {
      console.error('Error al obtener feature flag:', error);
      return false;
    }
  }
}
