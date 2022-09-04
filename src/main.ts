import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { repository } from './app/features/task-schedules/domain/repository';
import { talksSchedulesMemoryRepository } from './app/features/task-schedules/infrastructure/talksSchedulesMemoryRepository';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

repository.init(talksSchedulesMemoryRepository);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
