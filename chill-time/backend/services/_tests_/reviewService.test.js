// jest

// Verifies:
    // logic correctness
    // data transformation
    // error conditions

// Advantages:

    // No server needed
    // No database needed
    // Fast execution
    // Precise failure location
    import { jest } from '@jest/globals';

// mock BEFORE import
const createMock = jest.fn();

jest.unstable_mockModule("../../models/reviewModel.js", () => ({
    default: {
        create: createMock
    }
}));

// now import after mock
const { createService } = await import("../reviewService.js");
const model = (await import("../../models/reviewModel.js")).default;

describe("createService", () => {

    it("should create a review", async () => {
        createMock.mockResolvedValue({ id: 1 });

        const result = await createService({
            movie_id: "1",
            movie_title: "Test",
            rating: 5,
            review: "Good"
        });

        expect(result).toHaveProperty("id");
    });

    it("should normalize input before saving", async () => {
        createMock.mockResolvedValue({ id: 1 });

        await createService({
            movie_id: " 1 ",
            movie_title: " Test ",
            rating: "5",
            review: " Good "
        });

        expect(createMock).toHaveBeenCalledWith({
            movie_id: "1",
            movie_title: "Test",
            rating: 5,
            review: "Good"
        });
    });

});