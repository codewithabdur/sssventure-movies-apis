ALTER PROCEDURE [dbo].[usp_Post_Add]
    @Slug              NVARCHAR(300),
    @Title             NVARCHAR(500),
    @PosterUrl         NVARCHAR(1000),
    @PostType          TINYINT        = 2,
    @ReleaseYear       NVARCHAR(200)  = NULL,
    @Synopsis          NVARCHAR(MAX)  = NULL,
    @LanguageInfo      NVARCHAR(200)  = NULL,
    @PosterRedirectUrl NVARCHAR(1000) = NULL,
    @ScreenshotUrls    NVARCHAR(MAX)  = NULL,
    @Downloads         dbo.DownloadItemType READONLY
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @PostId INT;

    BEGIN TRY
        BEGIN TRAN;

        INSERT dbo.Posts (Slug, Title, PostType, ReleaseYear, Synopsis, LanguageInfo,
                          PosterUrl, PosterRedirectUrl, ScreenshotUrls)
        VALUES (@Slug, @Title, @PostType, @ReleaseYear, @Synopsis, @LanguageInfo,
                @PosterUrl, @PosterRedirectUrl, @ScreenshotUrls);

        SET @PostId = SCOPE_IDENTITY();

        INSERT dbo.PostDownloads
              (PostId, SeasonNumber, Quality, Codec, LinkType, EpisodeNumber,
               Label, FileSizeText, RedirectKey, TargetUrl, Epe_Link, SortOrder)
        SELECT @PostId,
               d.SeasonNumber,
               d.Quality,
               ISNULL(d.Codec, N''),
               CASE WHEN d.EpisodeNumber = 0 THEN 2 ELSE 1 END,
               d.EpisodeNumber,
               d.Label,
               d.FileSizeText,
               LEFT(REPLACE(CONVERT(VARCHAR(36), NEWID()), '-', ''), 10),
               d.TargetUrl,
               d.Epe_Link,
               d.SortOrder
        FROM @Downloads d;

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRAN;
        THROW;
    END CATCH

    SELECT @PostId AS PostId;

    SELECT DownloadId, SeasonNumber, Quality, Codec, LinkType, EpisodeNumber, RedirectKey, Epe_Link
    FROM dbo.PostDownloads
    WHERE PostId = @PostId
    ORDER BY SeasonNumber, Quality, Codec, LinkType DESC, EpisodeNumber;
END;
