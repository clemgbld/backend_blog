import express, { Express } from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { EmailService } from "../../../core/subscription/domain/gateway/email-service";
import { SubscriptionRepository } from "../../../core/subscription/domain/repositories/subscription-repository";
import { FilesRepository } from "../../../core/subscription/domain/repositories/files-repository";

describe("notify subscriberes controller", () => {
  it("should get a 201 response", async () => {});
});
