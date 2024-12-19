import { PrismaClient } from '@prisma/client'
import data from './data.json'

const prisma = new PrismaClient()

async function main() {
    const now = new Date();
    const quizData = data.quizzes;
    for (let i = 0; i < quizData.length; i++) {
        const quiz = quizData[i];
        console.log(`Creating quiz: ${quiz.code}`);
        await prisma.quizzes.create({
            data: {
                code: quiz.code,
                name: quiz.name,
                createdAt: now,
                updatedAt: now,
                quizQuestions: {
                    create: quiz.questions.map((question) => {
                        return {
                            question: question.question,
                            rewardPoints: question.rewardPoints,
                            createdAt: now,
                            updatedAt: now,
                            quizQuestionOptions: {
                                create: question.options.map((option) => {
                                    return {
                                        option: option.option,
                                        isCorrect: option.isCorrect,
                                        createdAt: now,
                                        updatedAt: now,
                                    }
                                })
                            }
                        }
                    })
                }
            }
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })