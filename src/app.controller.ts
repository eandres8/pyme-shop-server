import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Notificación de estado del sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: String,
  })
  @Get('health-check')
  healthCheck(): string {
    return 'pyme-shop is running!';
  }
}
