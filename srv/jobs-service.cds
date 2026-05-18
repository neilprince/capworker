service JobService {
    event completed { jobId: String; jobType: String; }
}