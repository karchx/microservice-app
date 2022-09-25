import { ProfileDto } from '@microservice-app/models';
import { PromisifyHttpService } from '@microservice-app/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  profileFeatureBaseUrl: string;

  constructor(
    private configSerive: ConfigService,
    private promisifyHttp: PromisifyHttpService
  ) {
    this.profileFeatureBaseUrl = this.configSerive.get<string>(
      'features.profile.baseUrl'
    );
  }

  async getProfile(username: string, authHeader: any): Promise<ProfileDto> {
    const url = `${this.profileFeatureBaseUrl}/profiles/${username}`;
    return await this.promisifyHttp.get(url, { headers: authHeader });
  }

  async addFollow(username: string, authHeader: any): Promise<ProfileDto> {
    const url = `${this.profileFeatureBaseUrl}/profiles/${username}/follow`;
    return await this.promisifyHttp.post(url, {}, { headers: authHeader });
  }

  async removeFollow(username: string, authHeader: any): Promise<ProfileDto> {
    const url = `${this.profileFeatureBaseUrl}/profiles/${username}/unfollow`;
    return await this.promisifyHttp.delete(url, { headers: authHeader });
  }
}
