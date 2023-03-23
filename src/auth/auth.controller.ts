import {
  AuthSignInOkResDto,
  AuthSignInWrongCodeDto,
  AuthSignUpCreatedDto,
  AuthSignInUnauthorizedResDto,
  AuthCategoryOkDto,
} from './dto/auth-res.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { UserService } from './../user/user.service';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GithubCodeDto, SignUpWithUserNameDto } from './dto/auth.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * @author MyeongSeok
   * @description 로그인
   * @param githubCode githubCode
   */
  @Post('/sign-in')
  @ApiOperation({
    summary: '로그인',
    description:
      'github code를 Body로 받아 accessToken을 리턴합니다. 그리고 응답 쿠키에 refreshToken을 반환합니다.',
  })
  @ApiOkResponse({
    description:
      '로그인에 성공하여 accessToken을 리턴합니다. 그리고 응답 쿠키에 refreshToken을 반환합니다.',
    type: AuthSignInOkResDto,
  })
  @ApiUnauthorizedResponse({
    description: '가입되지 않은 유저입니다.',
    type: AuthSignInUnauthorizedResDto,
  })
  @ApiBadRequestResponse({
    description: 'GitHub code에 문제가 있습니다.',
    type: AuthSignInWrongCodeDto,
  })
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() githubCode: GithubCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userInfo = await this.authService.signIn(githubCode);

    if (!userInfo.isMember) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(userInfo as AuthSignInUnauthorizedResDto);
    }

    const { userId, ...accessTokenWithUserInfo } = userInfo;

    const { refreshToken, ...cookieOptions } =
      await this.authService.getCookiesWithJwtRefreshToken(userId);

    await this.userService.setRefreshToken(refreshToken, userId);

    res
      .cookie('Refresh', refreshToken, cookieOptions)
      .json(accessTokenWithUserInfo as AuthSignInOkResDto);
  }

  /**
   * @author MyeongSeok
   * @description 회원가입
   * @param userData
   */
  @Post('/sign-up')
  @ApiOperation({
    summary: '회원가입',
    description:
      'userName, githubId, fieldId, careerId, isKorean 등 유저의 정보를 받아 회원가입 처리 이후 accessToken을 리턴합니다. 그리고 응답 쿠키에 refreshToken을 반환합니다.',
  })
  @ApiCreatedResponse({
    description:
      '회원가입이 되어 accessToken을 리턴합니다. 그리고 응답 쿠키에 refreshToken을 반환합니다.',
    type: AuthSignUpCreatedDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() userData: SignUpWithUserNameDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, userId } = await this.authService.signUp(userData);
    const { refreshToken, ...cookieOptions } =
      await this.authService.getCookiesWithJwtRefreshToken(userId);

    await this.userService.setRefreshToken(refreshToken, userId);

    res.cookie('Refresh', refreshToken, cookieOptions).json(accessToken);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('/sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    const refreshOptions = await this.authService.getCookiesForLogOut();

    await this.userService.deleteRefreshToken(req.user.id);

    res.cookie('Refresh', '', refreshOptions);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req) {
    const user = req.user;
    return this.authService.getJwtAccessToken(user.id, user.name);
  }

  /**
   * @author MyeongSeok
   * @description 회원가입 시 유저의 개인정보 선택지를 제공합니다.
   */
  @Get('/category')
  @ApiOperation({
    summary: '유저 정보 카테고리',
    description: '회원가입 시 유저의 개인정보 선택지를 제공합니다.',
  })
  @ApiOkResponse({
    description: '개발 분야, 개발 경력에 대한 카테고리를 리턴합니다.',
    type: AuthCategoryOkDto,
  })
  @HttpCode(HttpStatus.OK)
  getAuthCategory() {
    return this.authService.getAuthCategory();
  }
}
