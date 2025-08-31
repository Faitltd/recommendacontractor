Cloud Run deployment guide

Prerequisites
- Google Cloud project with billing enabled
- gcloud CLI installed and authenticated (gcloud auth login)
- Enable required services:
  gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

Build and push container (Artifact Registry)
1. Set variables
   # Use the itsfait.com project
   PROJECT_ID=recommendacontractor
   REGION=us-central1
   REPO=sveltekit
   IMAGE=$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/recomendacontractor

2. Create Artifact Registry repo (one-time)
   gcloud artifacts repositories create $REPO \
     --repository-format=docker \
     --location=$REGION \
     --description="Docker repo for SvelteKit app"

3. Build and push
   gcloud builds submit --tag $IMAGE .

Deploy to Cloud Run
1. Deploy service
   gcloud run deploy recomendacontractor \
     --image $IMAGE \
     --region $REGION \
     --platform managed \
     --allow-unauthenticated \
     --port 3000 \
     --min-instances=0 \
     --max-instances=3 \
     --memory=512Mi \
     --cpu=1

2. Set environment variables (if needed)
   gcloud run services update recomendacontractor \
     --region $REGION \
     --update-env-vars "NODE_ENV=production"

Notes
- The Dockerfile builds and runs the Node adapter server on port 3000.
- Adjust REGION and scaling parameters as needed.
- For custom domain mapping, use gcloud run domain-mappings or the Cloud Console.

