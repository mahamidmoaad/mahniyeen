declare module "resend" {
    export class Resend {
      constructor(apiKey: string);
      emails: {
        send(args: {
          from: string;
          to: string[];
          subject: string;
          text: string;
          html?: string;
        }): Promise<any>;
      };
    }
  }
  