--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid (mappend)
import           Hakyll
import           Text.Pandoc.Options (WriterOptions, writerHTMLMathMethod, HTMLMathMethod(MathJax))


--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
    match "images/*" $ do
        route   idRoute
        compile copyFileCompiler

    match "css/*" $ do
        route   idRoute
        compile compressCssCompiler

    match (fromList ["about.rst", "contact.markdown"]) $ do
        route   $ setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "templates/default.html" defaultContext
            >>= relativizeUrls

    match "posts/*" $ do
        route $ setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "templates/post.html"    postCtx
            >>= loadAndApplyTemplate "templates/default.html" postCtx
            >>= relativizeUrls
            
    match "math/*" $ do
        route $ setExtension "html"
        compile $ (pandocCompilerWith defaultHakyllReaderOptions (defaultHakyllWriterOptions { writerHTMLMathMethod = MathJax ""}))
    --      >>= loadAndApplyTemplate "templates/math.html" mathCtx
            >>= loadAndApplyTemplate "templates/default.html" mathCtx
            >>= relativizeUrls
        
    create ["archive.html"] $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            let archiveCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Archives"            `mappend`
                    defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
                >>= loadAndApplyTemplate "templates/default.html" archiveCtx
                >>= relativizeUrls


    match "index.html" $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            maths <- loadAll "math/*"
            let indexCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    listField "math" defaultContext (return maths) `mappend`
                    constField "title" "Home"                `mappend`
                    defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate "templates/default.html" indexCtx
                >>= relativizeUrls

    match "templates/*" $ compile templateCompiler


--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext

mathCtx :: Context String
mathCtx =
  constField "mathjax" (scriptConfig ++ mathJax ++ scriptClose)
  `mappend` defaultContext
  where
    scriptConfig = "<script type=\"text/javascript\" async src="
    mathJax="\"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML\""
    scriptClose="></script>"
