import {
  Expose,
  instanceToPlain,
  plainToInstance,
  Transform,
} from 'class-transformer';
import { IsEmail } from 'class-validator';

export class JwtPayloadDto {
  @Expose()
  @IsEmail()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  static toInstance(data: Partial<JwtPayloadDto>) {
    return plainToInstance(JwtPayloadDto, data, {
      excludeExtraneousValues: true,
    });
  }

  toPlain() {
    return instanceToPlain(this);
  }
}
