-- CreateIndex
CREATE INDEX "user_scores_score_updated_at_idx" ON "user_scores"("score" DESC, "updated_at" DESC);
