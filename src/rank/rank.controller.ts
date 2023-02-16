import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  RankerProfileOutput,
  SearchOutput,
  Top100,
  Top5,
} from './dto/rankerProfile.dto';
import { AvgValuesOutput, MaxValuesOutput } from './dto/ranking.dto';
import { RankService } from './rank.service';

@Controller('/ranks')
export class RankController {
  constructor(private rankService: RankService) {}

  @Get('/search')
  async findRanker(
    @Query('userName') userName: string,
  ): Promise<SearchOutput[]> {
    return await this.rankService.findRanker(userName);
  }

  @Get('/:userName')
  async getRankerDetail(@Param('userName') userName: string): Promise<{
    rankerDetail: RankerProfileOutput;
    maxValues: MaxValuesOutput;
    avgValues: AvgValuesOutput;
  }> {
    return await this.rankService.checkRanker(userName);
  }

  @Get('/ranking/top5')
  async getTop5(): Promise<Top5[]> {
    return await this.rankService.getTop5();
  }

  @Get('/ranking/top100')
  async getTop100(@Query('langFilter') langFilter: string): Promise<{
    langCategory: unknown[];
    top100: Top100[];
  }> {
    return await this.rankService.getTop100(langFilter);
  }

  @Get()
  async compareRanker(@Query('userName') userName: string[]) {
    const firstUser = await this.rankService.checkRanker(userName[0]);
    const secondUser = await this.rankService.checkRanker(userName[1]);
    return { firstUser, secondUser };
  }
}
