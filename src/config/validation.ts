import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum Environment {
  Local = 'local',
  Development = 'development',
  QA = 'qa',
  Staging = 'staging',
  Production = 'production',
}

export class EnvironmentAPIGatewayVariables {
  @IsString()
  TZ: string;

  @IsEnum(Environment)
  ENVIRONMENT: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsOptional()
  JWT_ACCESS_TOKEN_PUBLIC_KEY: string;

  @IsString()
  AUTH_SERVICE_URL: string;

  validate(config: Record<string, unknown>, options: Record<string, unknown>) {
    if (options.appName !== (process.env.APP_NAME || 'API_GATEWAY')) {
      return {};
    }

    const validatedConfig = plainToInstance(
      EnvironmentAuthServiceVariables,
      config,
      {
        enableImplicitConversion: true,
      },
    );
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const message = errors
        .flatMap(({ constraints }) =>
          Object.keys(constraints).flatMap((key) => constraints[key]),
        )
        .join('\n');
      console.error(`ENV Missing:\n${message}`);
      return {
        error: message,
      };
    }
    return { validatedConfig };
  }
}

export class EnvironmentAuthServiceVariables {
  @IsString()
  TZ: string;

  @IsEnum(Environment)
  ENVIRONMENT: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsOptional()
  JWT_ACCESS_TOKEN_PRIVATE_KEY: string;

  @IsString()
  @IsOptional()
  JWT_REFRESH_TOKEN_PRIVATE_KEY: string;

  @IsString()
  @IsOptional()
  JWT_REFRESH_TOKEN_PUBLIC_KEY: string;

  validate(config: Record<string, unknown>, options: Record<string, unknown>) {
    if (options.appName !== (process.env.APP_NAME || 'AUTH_SERVICE')) {
      return {};
    }

    const validatedConfig = plainToInstance(
      EnvironmentAuthServiceVariables,
      config,
      {
        enableImplicitConversion: true,
      },
    );
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      const message = errors
        .flatMap(({ constraints }) =>
          Object.keys(constraints).flatMap((key) => constraints[key]),
        )
        .join('\n');
      console.error(`ENV Missing:\n${message}`);
      return {
        error: message,
      };
    }
    return { validatedConfig };
  }
}