import { IsNotEmpty } from 'class-validator';
import VALIDATION_MESSAGES from 'src/common/validationMessages';

export class addExtraServiceDTO {
  @IsNotEmpty({
    message: VALIDATION_MESSAGES.CONTRACTID_REQUIRED_PT,
  })
  contractId: string;

  @IsNotEmpty({
    message: VALIDATION_MESSAGES.EXTRASERVICEID_REQUIRED_PT,
  })
  extraServiceId: number;
}
