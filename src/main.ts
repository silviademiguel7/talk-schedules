import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { repository } from './app/features/task-schedules/domain/repository';
import { talksSchedulesMemoryRepository } from './app/features/task-schedules/infrastructure/talksSchedulesMemoryRepository';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    repository.init(talksSchedulesMemoryRepository);
  })
  .catch((err) => console.error(err));
