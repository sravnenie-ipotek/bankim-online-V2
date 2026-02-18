import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminJwtGuard } from './guards/admin-jwt.guard';
import { AdminJwtPayload } from './interfaces/admin-jwt-payload.interface';

/** Request type after AdminJwtGuard has attached the decoded admin JWT. */
interface AdminRequest {
  admin: AdminJwtPayload;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /* ── Login (no guard — issues the token) ── */

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.adminService.login(email, password);
  }

  /* ── Profile (requires admin JWT) ── */

  @Get('profile')
  @UseGuards(AdminJwtGuard)
  getProfile(@Req() req: AdminRequest) {
    return this.adminService.getProfile(req.admin.id);
  }

  /* ── Stats ── */

  @Get('stats')
  @UseGuards(AdminJwtGuard)
  getStats() {
    return this.adminService.getStats();
  }

  /* ── Banks list ── */

  @Get('banks')
  @UseGuards(AdminJwtGuard)
  getBanks() {
    return this.adminService.getBanks();
  }

  /* ── Invitations ── */

  @Get('invitations')
  @UseGuards(AdminJwtGuard)
  getInvitations(
    @Query('status') status?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.adminService.getInvitations(
      status,
      parseInt(page),
      parseInt(limit),
    );
  }

  /* ── Approval queue ── */

  @Get('approval-queue')
  @UseGuards(AdminJwtGuard)
  getApprovalQueue(
    @Query('status') status = 'pending',
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.adminService.getApprovalQueue(
      status,
      parseInt(page),
      parseInt(limit),
    );
  }

  /* ── Approve worker ── */

  @Post('approve/:id')
  @UseGuards(AdminJwtGuard)
  approveWorker(
    @Param('id') id: string,
    @Body('comments') comments: string | undefined,
    @Req() req: AdminRequest,
  ) {
    return this.adminService.approveWorker(id, req.admin, comments);
  }

  /* ── Reject worker ── */

  @Post('reject/:id')
  @UseGuards(AdminJwtGuard)
  rejectWorker(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Req() req: AdminRequest,
  ) {
    return this.adminService.rejectWorker(id, req.admin, reason);
  }
}
